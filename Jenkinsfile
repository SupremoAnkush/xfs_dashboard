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
                withCredentials([usernamePassword(credentialsId: 'sudipa_nexus', passwordVariable: 'pass', usernameVariable: 'usr')]) {
                 sh label: '', script: 'curl -u ${usr}:${pass} --upload-file abcApp.zip http://ec2-3-17-164-37.us-east-2.compute.amazonaws.com:8081/nexus/content/repositories/devopstraining/xfs_dashboard/XFS.zip'
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
