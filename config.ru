use Rack::Static, urls: [''], root: 'public', index: 'index.html'

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/plain',
      'Cache-Control' => 'public, max-age=0'
    },
    "Not Found"
  ]
}
