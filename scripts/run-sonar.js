const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: process.env.SONAR_TOKEN || 'squ_your_token_here',
    options: {
      'sonar.projectKey': 'aromalife-backend',
      'sonar.projectName': 'Aromalife Backend',
      'sonar.sources': 'src',
      'sonar.tests': 'test',
      'sonar.exclusions': '**/node_modules/**,**/dist/**,**/*.spec.ts,**/*.e2e-spec.ts',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.coverage.exclusions': '**/*.spec.ts,**/*.e2e-spec.ts,**/main.ts,**/*.module.ts'
    }
  },
  () => process.exit()
);