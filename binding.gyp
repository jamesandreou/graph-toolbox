{
  "targets": [
    {
      "target_name": "planar",
      "sources": [ "planar.cc" ],
      "include_dirs": [
        ".",
        "<!(node -e \"require('nan')\")"
      ],
      "cflags_cc!": [ "-fno-rtti", "-fno-exceptions" ],
      "cflags!": [ "-fno-exceptions" ]
    }
  ]
}