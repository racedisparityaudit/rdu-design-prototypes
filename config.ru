require 'rack/contrib'

use Rack::TryStatic,
  urls: [''],
  root: 'public',
  try: ['.html'],
  index: 'index.html'

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/plain',
      'Cache-Control' => 'public, max-age=0'
    },
    ["Not Found"]
  ]
}
