    #!/bin/bash

    # create archive
    # tar -zcvf ./build/build.tar.gz ./build

    # ------------
    # deploy to oz
    # ------------
    echo '@@@@ deploy to oz'
    /usr/bin/sshpass -p 'OZ_deploy' scp -o StrictHostKeyChecking=no -r "$(readlink -f ./build)" deploy@oz.digital:/var/www/paxum-landing.oz.digital

