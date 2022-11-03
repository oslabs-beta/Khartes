import * as React from 'react';
const jsyaml = require('js-yaml');
const yaml = require('yaml');

const YamlView = () => {

  /* as of 3:09 pm on 11/3 we are going to be getting pod data and storing cpu/memory limits
  like so,

items[0]. : 
spec.container.resources.limits.cpu
spec.container.resources.limits.memory
spec.container.resources.requests.cpu
spec.container.resources.requests.memory

 resources:
        limits:
          cpu: 200m
          memory: 200M
        requests:
          cpu: 100m
          memory: 100M

so our fetch with request some portion of the above, maybe the whole resources key
*/

  const yamlText = `{{- if (include "postgresql.primary.createConfigmap" .) }}
  apiVersion: v1
  kind: ConfigMap
  metadata:
    name: {{ printf "%s-configuration" (include "postgresql.primary.fullname" .) }}
    namespace: {{ .Release.Namespace | quote }}
    labels: {{- include "common.labels.standard" . | nindent 4 }}
      app.kubernetes.io/component: primary
      {{- if .Values.commonLabels }}
      {{- include "common.tplvalues.render" ( dict "value" .Values.commonLabels "context" $ ) | nindent 4 }}
      {{- end }}
    {{- if .Values.commonAnnotations }}
    annotations: {{- include "common.tplvalues.render" ( dict "value" .Values.commonAnnotations "context" $ ) | nindent 4 }}
    {{- end }}
  data:
    {{- if .Values.primary.configuration }}
    postgresql.conf: |-
      {{- include "common.tplvalues.render" ( dict "value" .Values.primary.configuration "context" $ ) | nindent 4 }}
    {{- end }}
    {{- if .Values.primary.pgHbaConfiguration }}
    pg_hba.conf: |
      {{- include "common.tplvalues.render" ( dict "value" .Values.primary.pgHbaConfiguration "context" $ ) | nindent 4 }}
    {{- end }}
  {{- end }}`

  const resourcesText = ` resources:
  limits:
    cpu: 200m
    memory: 200M
  requests:
    cpu: 100m
    memory: 100M`

//   const getYamlFile = () => {
//   let fileHandle;
 
// document.querySelector(".pick-file").onclick = async () => {
//  [fileHandle] = await window.showOpenFilePicker();
 
//  const file = await fileHandle.getFile();
//  const content = await file.text();
 
//  return content;
// }

// const getYamlFile = () => {
// let result = (fetch('/yamlendpoint', {
//   headers: {
//       Accept: 'application.json',
//       'Content-Type': 'application/json'
//   },
//   body: JSON.stringify() // body will be used to specify the requested file
// })
// .then(res => console.log(res)))
// .then()
// }

// const display = jsyaml.dump(resourcesText)
const display = yaml.stringify(resourcesText);
// const display = yaml.parse(resourcesText)

    // this component will display a yaml file
        return(
          <div>
            <div> {display} </div>
            WORDS
          </div>
        )
      }
    
      export default YamlView;