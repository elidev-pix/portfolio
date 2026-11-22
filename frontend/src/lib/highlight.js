import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'
import sql from 'highlight.js/lib/languages/sql'
import yaml from 'highlight.js/lib/languages/yaml'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import nginx from 'highlight.js/lib/languages/nginx'
import ini from 'highlight.js/lib/languages/ini'

const langs = { bash, shell: bash, sh: bash, java, javascript, js: javascript, jsx: javascript, python, sql, yaml, yml: yaml, json, xml, html: xml, css, dockerfile, nginx, ini, conf: ini }
Object.entries(langs).forEach(([name, def]) => hljs.registerLanguage(name, def))
export default hljs
