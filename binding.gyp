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
      "cflags!": [ "-fno-exceptions" ],
      'xcode_settings': {
        'MACOSX_DEPLOYMENT_TARGET': '10.7',

        'OTHER_CFLAGS': [
          "-std=c++11",
          "-stdlib=libc++"
        ],
      },
    }
  ]
}