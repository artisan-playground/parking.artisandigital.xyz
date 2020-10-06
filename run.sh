
docker pull trwfff/parking-artisan
docker rm -f web
docker run -d -it \
        --name web \
        -v /home/1st/artisan-playground-firebase-adminsdk-rktce-3369f2cb29.json:/usr/src/app/sa.json \
        -v /home/1st/images:/usr/src/app/images \
        -e GOOGLE_APPLICATION_CREDENTIALS=/usr/src/app/sa.json \
        -e channelAccessToken='MQvGhHT7HHH4J4ScN89Maoqsl1I7P5YXG+g0Qr8PPevc3aX5al4w3rSx73M75E9US1RzgNanxaF8717zqih05uddlGejMbXgqsdzAI/lhu3sCQidaebwJUowHDtNo9QETB301lm/41i8f+S3dYO6tQdB04t89/1O/w1cDnyilFU=' \
        -e channelSecret='740165596062a0e288fe83df103bbf74' \
        -e baseUrl='https://parking.artisandigital.xyz' \
        -p80:4000 --init \
        trwfff/parking-artisan
