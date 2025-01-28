  "win": {
      "target": [
        "nsis"
      ],
      "icon": "build/icon.ico",
      "sign": true,
      "signtoolOptions": {
        "certificateFile": "certificate.p12",
        "certificatePassword": "sojan",
        "rfc3161TimeStampServer": "http://timestamp.digicert.com"
        

      }
    },

signtool sign /f "certificate.p12" /p "sojan" /tr "http://timestamp.digicert.com" /td sha256 /fd sha256 /v "dist\win-unpacked\Invoizify.exe"  
