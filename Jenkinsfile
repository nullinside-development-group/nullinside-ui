pipeline {
    agent any
	options {
        ansiColor('xterm')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: env.BRANCH_NAME, credentialsId: 'GitHub PAT', url: 'https://github.com/ProgrammingByPermutation/nullinside-ui.git'
            }
        }
        
        stage('Build & Deploy') {
            steps {
				sh """
					bash go.sh 
				"""
            }
        }
    }
	
	post {
		always {
			cleanWs cleanWhenFailure: false, notFailBuild: true
		}
	}
}
