pipeline {
    agent {
        docker {
            image 'node:8-alpine'
            args '-v /usr/share/nginx/html/faldax/frontend:/var/empty'
        }
    }
    stages {
        stage('Build') {
            steps {
               sh 'npm install'
                script {
                    if (env.BRANCH_NAME == 'meghal-faldax') {
                        sh 'npm run build'
                    } else if(env.BRANCH_NAME == 'somethingsomething') {
                        sh 'lets do something'
                    }
                }
            }
        }

        stage('Deploy'){
            steps{
                script {
                    if (env.BRANCH_NAME == 'meghal-faldax') {
                        echo 'Deleting the old build.  '
                        sh 'rm -r /var/empty/*'
                        echo 'Old build deleted, Deploying new build'
                        sh 'cp -a build/. /var/empty/'
                        echo 'Build Deployed. '
                    } else if(env.BRANCH_NAME == 'meri') {
                        echo ' Jenkins ka dewana'
                    }
                }
            }
        }
    }
}
