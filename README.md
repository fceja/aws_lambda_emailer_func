
<u>docker must be running in the background</u> <br/>
`sudo ln -sf "$HOME/.docker/run/docker.sock" /var/run/docker.sock`

<u>compile typescript to javascript (@ lambda func level)</u> <br/>
`tsc`

<u>build (@ project root)</u> <br/>
`sam build`

<u>invoke locally with event (@ project root)</u> <br/>
`sam local invoke SendEmailFunction --event lambdas/sendEmailFunc/event.json`

<u>invoke locally with no event (@ project root)</u> <br/>
`sam local invoke SendEmailFunction`

<u>zipping</u> <br/>
`zip -r {path_to_lambda_dist}/{lambda_func}.zip \*`

<u>zip and upload (@ lambdas/{func_name}/dist)</u> <br/>
`zip -r -D lambda.zip \* && aws lambda update-function-code --function-name {lambda_func} --zip-file fileb://lambda.zip --profile {profile}`
