export default ({ content }) => (
  <div className='content'>
    <div dangerouslySetInnerHTML={{__html: content}}></div>
    <style jsx global>{`


@media (min-width: 1000px){
  pre {
    margin: 0 -40px;
  }
}

pre {
  text-size-adjust: none;
  background: #fbf9ec;
  color: #4d4d4c;
  line-height: 24px;
  tab-size: 2;
  font-family: Consolas,Menlo,Monaco,'Lucida Console','Liberation Mono','DejaVu Sans Mono','Bitstream Vera Sans Mono','Courier New',monospace,serif;
  padding: 18px 50px;
  overflow: scroll;
}


.hljs{display:block;padding:.5em;background:#23241f}.hljs,.hljs-tag,.css .hljs-rules,.css .hljs-value,.css .hljs-function .hljs-preprocessor,.hljs-pragma{color:#f8f8f2}.hljs-strongemphasis,.hljs-strong,.hljs-emphasis{color:#a8a8a2}.hljs-bullet,.hljs-blockquote,.hljs-horizontal_rule,.hljs-number,.hljs-regexp,.alias .hljs-keyword,.hljs-literal,.hljs-hexcolor{color:#ae81ff}.hljs-tag .hljs-value,.hljs-code,.hljs-title,.css .hljs-class,.hljs-class .hljs-title:last-child{color:#a6e22e}.hljs-link_url{font-size:80%}.hljs-strong,.hljs-strongemphasis{font-weight:bold}.hljs-emphasis,.hljs-strongemphasis,.hljs-class .hljs-title:last-child{font-style:italic}.hljs-keyword,.hljs-function,.hljs-change,.hljs-winutils,.hljs-flow,.lisp .hljs-title,.clojure .hljs-built_in,.nginx .hljs-title,.tex .hljs-special,.hljs-header,.hljs-attribute,.hljs-symbol,.hljs-symbol .hljs-string,.hljs-tag .hljs-title,.hljs-value,.alias .hljs-keyword:first-child,.css .hljs-tag,.css .unit,.css .hljs-important{color:#f92672}.hljs-function .hljs-keyword,.hljs-class .hljs-keyword:first-child,.hljs-constant,.css .hljs-attribute{color:#66d9ef}.hljs-variable,.hljs-params,.hljs-class .hljs-title{color:#f8f8f2}.hljs-string,.css .hljs-id,.hljs-subst,.haskell .hljs-type,.ruby .hljs-class .hljs-parent,.hljs-built_in,.sql .hljs-aggregate,.django .hljs-template_tag,.django .hljs-variable,.smalltalk .hljs-class,.django .hljs-filter .hljs-argument,.smalltalk .hljs-localvars,.smalltalk .hljs-array,.hljs-attr_selector,.hljs-pseudo,.hljs-addition,.hljs-stream,.hljs-envvar,.apache .hljs-tag,.apache .hljs-cbracket,.tex .hljs-command,.hljs-prompt,.hljs-link_label,.hljs-link_url{color:#e6db74}.hljs-comment,.hljs-javadoc,.java .hljs-annotation,.python .hljs-decorator,.hljs-template_comment,.hljs-pi,.hljs-doctype,.hljs-deletion,.hljs-shebang,.apache .hljs-sqbracket,.tex .hljs-formula{color:#75715e}.coffeescript .javascript,.javascript .xml,.tex .hljs-formula,.xml .javascript,.xml .vbscript,.xml .css,.xml .hljs-cdata,.xml .php,.php .xml{opacity:.5}


/* 参考：https://ponyfoo.com/books/practical-es6/chapters/2#read */

.hljs-string, .hljs-subst {
  color: #718c00;
}

.hljs-tag {
  color: #3e999f;
}


.hljs-built_in, .hljs-variable, .hljs-params, .hljs-class .hljs-title {
  color: #4271ae;
}

.hljs-function .hljs-keyword, .hljs-class .hljs-keyword:first-child, .hljs-constant, .css .hljs-attribute {
  color: #8959a8;
}
      `}
    </style>
  </div>
)
