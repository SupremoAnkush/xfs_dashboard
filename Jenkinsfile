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
       /* stage('SonarQube') {    
              steps {
              sh 'npm install sonarqube-scanner --save-dev'
              sh 'npm run sonar' 
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
                 sh label: '', script: 'curl -v -u ${ankush_nexus}:${ankush_nexus_password}  --upload-file XFS.zip  http://18.224.155.110:8081/nexus//content/repositories/devopstraining/xfs_dashboard/XFS-${BUILD_NUMBER}.zip'
                //sh label: '', script: 'curl -v -u ${ankush_nexus}:${ankush_nexus_password} --upload-file ankushApp.zip http://3.17.164.37:8081/nexus/content/repositories/devopstraining/Team_AHM/ankush-${BUILD_NUMBER}.zip'
                }
                
            }
        }
        stage ('Deploy') {
            steps {
              withCredentials([file(credentialsId: 'angular-react-deployment-server', variable: 'deployment_server')]) {
                   sh 'scp -v -i ${deployment_server} XFS.zip ubuntu@18.188.202.13:/home/ubuntu'
                   sh 'ssh -v -i ${deployment_server} ubuntu@18.188.202.13 "cd /home/ubuntu; unzip -o XFS.zip -d xfs_dashboard;pm2 restart "xfs_dashboard""'
                  
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
