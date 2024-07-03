// docker must be running in the background
sudo ln -sf "$HOME/.docker/run/docker.sock" /var/run/docker.sock

// compile typescript to javascript (at lambda func level)
tsc

// build (at project root)
sam build

// invoke locally with event (at project root)
sam local invoke SendEmailFunction --event lambdas/sendEmailFunc/event.json

// invoke locally with no event (at project root)
sam local invoke SendEmailFunction

// zipping
zip -r {path_to_lambda_dist}/{lambda_func}.zip \*

// zip and upload (at lambdas/func/dist)
zip -r -D lambda.zip \* && aws lambda update-function-code --function-name sendEmailFunc --zip-file fileb://lambda.zip --profile updateLambda
