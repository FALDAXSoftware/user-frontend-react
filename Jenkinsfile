#!/usr/bin/env groovy
def label = "buildpod.${env.JOB_NAME}.${env.BUILD_NUMBER}".replace('-', '_').replace('/', '_').take(63)
def gitCredentialsId = "github"
def imageRepo = "100.69.158.196"
podTemplate(label: label, containers: [
     containerTemplate(name: 'build-container', image: imageRepo + '/buildtool:deployer', command: 'cat', ttyEnabled: true),
     containerTemplate(name: 'node', image: 'node:8-alpine', command: 'cat', ttyEnabled: true),
], 
volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
  ]
){
  timeout(25){
      def coinToDeploy;
      def triggerByUser;
      def namespace;
      node(label) {
     
         // Wipe the workspace so we are building completely clean
         deleteDir()

         stage('Docker Build'){
         container('node'){
              def myRepo = checkout scm
              gitCommit = myRepo.GIT_COMMIT
              shortGitCommit = "${gitCommit[0..10]}"
              imageTag = shortGitCommit
              namespace = getNamespace(myRepo.GIT_BRANCH);
              if (namespace){
              sh "ls -la"
              sh "npm cache clear --force && npm install --no-shrinkwrap --update-binary" 
              sh "npm uninstall webpack"
              sh "npm uninstall webpack-dev-server"
              sh "npm install webpack"
              sh "npm run build"
              sh "ls -la" 
              if (env.BRANCH_NAME == 'master') {
                    withAWS(credentials:'jenkins_s3_upload') {
                    s3Delete(bucket:'trade.faldax.com', path:'')
                    s3Upload(file:'build', bucket:'trade.faldax.com', path:'')
                }                       
                } else if(env.BRANCH_NAME == 'development') {
                    withAWS(credentials:'jenkins_s3_upload') {
                    s3Delete(bucket:'dev.faldax.com', path:'')
                    s3Upload(file:'build', bucket:'dev.faldax.com', path:'')
                }
                } else if(env.BRANCH_NAME == 'preprod') {
                    withAWS(credentials:'jenkins_s3_upload') {
                    s3Delete(bucket:'preprod-trade.faldax.com', path:'')
                    s3Upload(file:'build', bucket:'preprod-trade.faldax.com', path:'')
                }
                } else if(env.BRANCH_NAME == 'mainnet') {
                    withAWS(credentials:'jenkins_s3_upload') {
                    s3Delete(bucket:'mainnet-trade.faldax.com', path:'')
                    s3Upload(file:'build', bucket:'mainnet-trade.faldax.com', path:'')
                }
                }

         }
         }

         }
    }   } }




def getNamespace(branch){
    switch(branch){
        case 'master' : return "prod";
        case 'development' :  return "dev";
        case 'preprod' :  return "preprod";
        case 'mainnet' :  return "mainnet";
        default : return null;
    }
}

