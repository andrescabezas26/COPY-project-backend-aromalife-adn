terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }

  required_version = ">= 1.6.0"
}

provider "azurerm" {
  features {}
}

# ---------------------------
# RECURSOS PRINCIPALES
# ---------------------------

# 1. Grupo de recursos
resource "azurerm_resource_group" "sonarqube_rg" {
  name     = "rg-sonarqube"
  location = var.location
}

# 2. Red virtual y subred
resource "azurerm_virtual_network" "vnet" {
  name                = "sonarqube-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = var.location
  resource_group_name = azurerm_resource_group.sonarqube_rg.name
}

resource "azurerm_subnet" "subnet" {
  name                 = "sonarqube-subnet"
  resource_group_name  = azurerm_resource_group.sonarqube_rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# 3. IP pública
resource "azurerm_public_ip" "public_ip" {
  name                = "sonarqube-ip"
  location            = var.location
  resource_group_name = azurerm_resource_group.sonarqube_rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# 4. Grupo de seguridad de red (NSG)
resource "azurerm_network_security_group" "nsg" {
  name                = "sonarqube-nsg"
  location            = var.location
  resource_group_name = azurerm_resource_group.sonarqube_rg.name

  security_rule {
    name                       = "Allow-SonarQube"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "9000"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "Allow-SSH"
    priority                   = 200
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# 5. Interfaz de red (NIC)
resource "azurerm_network_interface" "nic" {
  name                = "sonarqube-nic"
  location            = var.location
  resource_group_name = azurerm_resource_group.sonarqube_rg.name

  ip_configuration {
    name                          = "sonarqube-ipconfig"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.public_ip.id
  }
}

# 6. Asociación del NSG a la NIC
resource "azurerm_network_interface_security_group_association" "nsg_assoc" {
  network_interface_id      = azurerm_network_interface.nic.id
  network_security_group_id = azurerm_network_security_group.nsg.id
}

# 7. Máquina Virtual (Ubuntu)
resource "azurerm_linux_virtual_machine" "vm" {
  name                = "vm-sonarqube"
  location            = var.location
  resource_group_name = azurerm_resource_group.sonarqube_rg.name
  size                = "Standard_B2s"
  admin_username      = var.admin_username
  admin_password      = var.admin_password
  disable_password_authentication = false

  network_interface_ids = [azurerm_network_interface.nic.id]

  
  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts-gen2"
    version   = "latest"
  }

  custom_data = filebase64("setup-sonarqube.sh")
}

# 8. Salidas
output "sonarqube_public_ip" {
  value = azurerm_public_ip.public_ip.ip_address
}
