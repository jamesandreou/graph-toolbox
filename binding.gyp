{
  "targets": [
    {
      "target_name": "planar",
      "sources": [ "planar.cc" ],
      "include_dirs": [
        "."
      ],
      "cflags_cc!": [ "-fno-rtti", "-fno-exceptions" ],
      "cflags!": [ "-fno-exceptions" ]
    }
  ]
}