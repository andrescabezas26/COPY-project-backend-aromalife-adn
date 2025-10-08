variable "location" {
  description = "Región de Azure"
  type        = string
  default     = "eastus"
}

variable "admin_username" {
  description = "Usuario administrador de la VM"
  type        = string
  default     = "azureuser"
}

variable "admin_password" {
  description = "Contraseña para la VM"
  type        = string
  default     = "Aromalife@2025#dev"
}
