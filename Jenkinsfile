def sshScripts = '''
whoami
ls -la
pwd
'''
def dockerScripts = '''
cd /home/muraji/work/vue2/custom_timer
git pull
cd ./docker
docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml up -d
'''

pipeline{
    agent any
    stages{
        stage("Build"){
            steps {
                sshagent(credentials: ['329556f7-5b4d-4e03-b4ef-7c9497d42db4']) {
                    sh "ssh muraji@192.168.10.111 '${sshScripts}'"
                }
                sh '''
                docker-compose -f ./docker/docker-compose.build.yml build
                docker-compose -f ./docker/docker-compose.build.yml push
                '''
            }
            post{
                always{
                    echo "========always========"
                }
                success{
                    echo "========A executed successfully========"
                }
                failure{
                    echo "========A execution failed========"
                }
            }
        }
        stage("Deploy"){
            steps{
                echo "====++++executing Deploy++++===="
                sshagent(credentials: ['329556f7-5b4d-4e03-b4ef-7c9497d42db4']) {
                    sh "ssh muraji@192.168.10.111 '${sshScripts}'"
                }
            }
            post{
                always{
                    echo "====++++always++++===="
                }
                success{
                    echo "====++++Deploy executed successfully++++===="
                }
                failure{
                    echo "====++++Deploy execution failed++++===="
                }
        
            }
        }
    }
    post {
        always {
        echo '========always========'
        }

        success {
        echo '========pipeline executed successfully ========'
        }

        failure {
        echo '========pipeline execution failed========'
        }
    }
}