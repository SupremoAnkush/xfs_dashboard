pipeline 
{
    agent any
    
    
    tools {nodejs "nodejs"}
    
    
    
    stages {
       
        stage('installing dependencies') {
            steps {
               sh 'npm install'
            }
        }
         /* stage('test') {
              steps {
                 sh 'npm run test'
              }
         }*/
       /*stage('SonarQube') 
       {
           
            environment {
                scannerHome=tool 'sonar scanner'
            }
             //tools {scannerHome "SonarScanner"}
        steps{
             withSonarQubeEnv(credentialsId: 'sonar_token_ankush', installationName: 'sonar_server') {
                  sh '${scannerHome}/bin/sonar-scanner -Dproject.settings=./sonar-project.properties'
              }
              //sh 'npm run sonar'
           }
            
        }*/
       
        stage('build') {
            steps {
                sh 'npm run build'
                
            }
        }
        stage ('zipping'){
            steps {
                 
                sh 'cd 	dist/XFS; zip -r ../../XFS.zip . ;'
            }
        }
        stage ('Nexus'){
            steps{
                sh 'ls'
                withCredentials([usernamePassword(credentialsId: 'ankush_nexus_key', passwordVariable: 'ankush_nexus_password', usernameVariable: 'ankush_nexus')]) {
                 sh label: '', script: 'curl -v -u ${ankush_nexus}:${ankush_nexus_password}  --upload-file XFS.zip  http://18.224.155.110:8081/nexus/content/repositories/devopstraining/xfs_dashboard/XFS-${BUILD_NUMBER}.zip'
                //sh label: '', script: 'curl -v -u ${ankush_nexus}:${ankush_nexus_password} --upload-file ankushApp.zip http://3.17.164.37:8081/nexus/content/repositories/devopstraining/Team_AHM/ankush-${BUILD_NUMBER}.zip'
                }
                
            }
        }
        stage ('Deploy') {
            steps {
              withCredentials([file(credentialsId: 'deploy-server', variable: 'deployment')])  {
                   sh 'scp -v -i ${deployment} -o StrictHostKeyChecking=no XFS.zip ubuntu@13.233.251.211:/home/ubuntu'
                   sh 'ssh -v -i ${deployment} -o StrictHostKeyChecking=no ubuntu@13.233.251.211 "cd /home/ubuntu; unzip -o XFS.zip -d xfs_dashboard;pm2 restart "xfs_dashboard" -p 3000 "'                  
               }
            }
        }
        
    }
    post { 
         success { 
            
            slackSend (color: '#00BB00', message: " SUCCESS: Job '${JOB_NAME} [${BUILD_NUMBER}]' (${BUILD_URL})")
         }
         failure {
            
            slackSend (color: '#BB0000', message: " FAILURE: Job '${JOB_NAME} [${BUILD_NUMBER}]' (${BUILD_URL})")
         }
    }

}
