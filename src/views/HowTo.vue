<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--500" no-body>
          <div class="px-4">
            
            <div class="mt-3 py-5 ">
                <div class="text-center">
              <h2 class="display-3 ">How to integrate with CheckIT</h2>
              <p class="lead">
                  Integrate your app with CheckIT is one of the easiest thing in the world. We done our best to make integration as easy as it is posiible and secure in the same time. 
To integrate you need to get your external token from your profile. Then, make a <b>POST</b> request to
<badge type="primary" class="text-lowercase"> {{this.api_host}}/api/ext/v1/check-message</badge>
<br>
 with headers <badge type="primary" class="text-lowercase">  {
  'x-checkit-external-auth': '{{external_token}}',
  'Content-Type': 'application/json'
}
</badge>
<br>
 and body <badge type="primary" class="text-lowercase">  {
    "message": "Your message",
    "save_to_db": true
}
</badge>.<br>
Response will be look like:  <badge type="primary" class="text-lowercase">  {
    "message": "Your message",
    "is_generated": false,
    "generated_percent": 44.7
}
</badge>
<br>And ... Enjoy your coffee &#9749;
              </p>
                </div>
            <span class="display-4 text-center">Code snippets</span>
              <tabs fill class="flex-column flex-md-row">
                    <card shadow>
                        <tab-pane title="Python">
                            <p class="align-self-start">
                                <pre>
import requests
import json

url = "{{this.api_host}}/api/ext/v1/check-message"

payload = json.dumps({
  "message": "Your message",
  "save_to_db": True
})
headers = {
  'x-checkit-external-auth': '{{external_token}}',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text['message'])
print(response.text['is_generated'])
print(response.text['generated_percent'])
                                </pre>
                            </p>
                        </tab-pane>

                        <tab-pane title="Golang">
                            <p class="description">
                                <pre>
package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "{{this.api_host}}/api/ext/v1/check-message"
  method := "POST"

  payload := strings.NewReader(`{
    "message": "Your message",
    "save_to_db": true
}`)

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("x-checkit-external-auth", "Lpe_4xnm5B7DFu7ElelS4A==")
  req.Header.Add("Content-Type", "application/json")

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}
                                </pre>
                            </p>
                        </tab-pane>

                        <tab-pane title="curl">
                            <p class="description">
                                <pre>
curl --location --request POST '{{this.api_host}}/api/ext/v1/check-message' \
--header 'x-checkit-external-auth: Lpe_4xnm5B7DFu7ElelS4A==' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "Your message",
    "save_to_db": true
}'                                    
                                </pre>
                            </p>
                        </tab-pane>

                        <tab-pane title="NodeJs">
                            <p class="description">
                                <pre>
var axios = require('axios');
var data = JSON.stringify({
  "message": "Your message",
  "save_to_db": true
});

var config = {
  method: 'post',
  url: '{{this.api_host}}/api/ext/v1/check-message',
  headers: { 
    'x-checkit-external-auth': 'Lpe_4xnm5B7DFu7ElelS4A==', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});            
                                </pre>
                            </p>
                        </tab-pane>
                        <tab-pane title="Dart">
                            <p class="description">
                                <pre>
var headers = {
  'x-checkit-external-auth': 'Lpe_4xnm5B7DFu7ElelS4A==',
  'Content-Type': 'application/json'
};
var request = http.Request('POST', Uri.parse('{{this.api_host}}/api/ext/v1/check-message'));
request.body = json.encode({
  "message": "Your message",
  "save_to_db": true
});
request.headers.addAll(headers);

http.StreamedResponse response = await request.send();

if (response.statusCode == 200) {
  print(await response.stream.bytesToString());
}
else {
  print(response.reasonPhrase);
}
                                </pre>
                            </p>
                        </tab-pane>
                    </card>
                </tabs>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import { VBPopover } from "bootstrap-vue/esm/directives/popover/popover";
import TokenService from "../services/token";
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";

export default {
  data() {
    return {
      external_token: "",
      api_host: "",
    };
  },
  components: {
    Tabs,
    TabPane,
  },

  mounted() {
    this.external_token = TokenService.getUser().id;
    this.api_host = process.env.VUE_APP_API_HOST;
  },

  directives: {
    BPopover: VBPopover,
  },
};
</script>
<style>
</style>
