name = 'google';

description = 'Google web search';

function queryUrl(search) {
  var base = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=%QUERY%";
  return base.replace('%QUERY%', encodeURIComponent(search));
}

function buildResultNode(result) {
  var box = document.createElement('vbox');
  box.setAttribute('class', 'result');
  box.setAttribute('href', result.unescapedUrl);
  var title = document.createElementNS("http://www.w3.org/1999/xhtml", "html:div");
  title.setAttribute('class', 'title');
  fakeHTMLinXUL(result.title, title);
  box.appendChild(title);
  var description = document.createElementNS("http://www.w3.org/1999/xhtml", "html:div");
  description.setAttribute('class', 'description');
  fakeHTMLinXUL(result['content'], description);
  box.appendChild(description);
  var url = document.createElementNS("http://www.w3.org/1999/xhtml", "html:div");
  url.setAttribute('class', 'url');
  fakeHTMLinXUL(result.unescapedUrl, url);
  box.appendChild(url);
  return box;
}

function process(json) {
  if (!json.responseData.results) {
    return [];
  }
  return json.responseData.results;
}

function details(json) {
  return "Estimated Results: " + json.responseData.cursor.estimatedResultCount;
}

var css = (<r><![CDATA[

#searchy .result .title
{
  font-size: 1.3em;
  padding-bottom: 5px;
  color: #ffa;
  max-height: 1em;
  overflow: hidden;
}

#searchy .result .description
{
  padding-bottom: 5px;
}

#searchy .result .url
{
  padding-bottom: 5px;
  color: #08f;
  text-decoration: underline;
  max-height: 1em;
  line-height: 1em;
  overflow: hidden;
}

]]></r>).toString();

