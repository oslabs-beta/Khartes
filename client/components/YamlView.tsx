import * as React from 'react';
const jsyaml = require('js-yaml');

const YamlView = () => {

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

const yaml = jsyaml.load(yamlText)

    // this component will display a yaml file
        return(
          <div>
            <div> {yaml} </div>
          </div>
        )
      }
    
      export default YamlView;