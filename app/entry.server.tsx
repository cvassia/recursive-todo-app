import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import type { EntryContext } from '@remix-run/node';
import { ServerStyleSheet } from 'styled-components';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const sheet = new ServerStyleSheet();

  try {
    const markup = renderToString(
      sheet.collectStyles(<RemixServer context={remixContext} url={request.url} />)
    );

    const styles = sheet.getStyleTags();
    responseHeaders.set('Content-Type', 'text/html');

    return new Response('<!DOCTYPE html>' + markup.replace('</head>', `${styles}</head>`), {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  } finally {
    sheet.seal();
  }
}
