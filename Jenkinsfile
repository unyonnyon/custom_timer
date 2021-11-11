pipeline{
    agent any
    stages{
        stage("A"){
            steps {
                sshagent(credentials: ['329556f7-5b4d-4e03-b4ef-7c9497d42db4']) {
                    sh '''
                       ssh muraji@192.168.10.111
                       whoami
                       ls -la
                    '''
                }
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
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}