pipeline {
    environment {
    registry = "ctruh.azurecr.io/frontend/solar_dashboard"
    containername = "solar_dashboard"
    http_port = "3005"
    registryCredential = 'acrid'
    dockerImage = ''
    }

    agent { label params.Environment }
    stages {
            stage('Checkout') {
             agent none
                steps {
                checkout scm
                }
            }
            stage('set Environment File') {
                steps {
                    script {
                    writeFile file: 'envfile', text: "${params.EnvVariables}"
                    writeFile file: './.env.production', text: "${params.EnvVariables}"
                    writeFile file: './.env', text: "${params.EnvVariables}"
                    writeFile file: './env', text: "${params.EnvVariables}"
                    }
                }
            }

            stage ('Image Prune') { 
                steps {
                        imagePrune(containername)
                        echo "Image prune is complete"
                }
            }
            stage('Building Docker Image') {
                steps {
                    script {
                        sh "whoami"
                        dockerImage = docker.build(registry+":v1.$BUILD_NUMBER", "-f Dockerfile .")
                    }
                }
            }

            stage('Deploy Container') {
                    steps {
                        runApp(containername, http_port)
                        echo "$containername deployement complete"
                }
            }
//            stage('Cleaning Up') {
//                steps{
//                  sh "docker rmi --force $registry:v1.$BUILD_NUMBER"
//                }
//            }
        }
    }

def imagePrune(containerName){
    try {
        sh "docker image prune -f"
        sh "docker stop $containerName"
    } catch(error){}
}

def runApp(containerName, httpPort){
        sh "docker run -d --rm -p $httpPort:3000 --name $containerName --env-file ./envfile $registry:v1.$BUILD_NUMBER"
        echo "Application started on port: ${httpPort} (http)"
}
