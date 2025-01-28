# Name of the uninstaller
Outfile "uninstaller.exe"

# Set the name of the uninstaller
Name "Invoizify Uninstaller"

# Directory where the app was installed
InstallDir $PROGRAMFILES\Invoizify

# Default section to uninstall the app
Section "Uninstall"
  # Delete files, registry entries, etc. that were installed
  Delete $INSTDIR\Invoizify.exe
  # Add more files that need to be deleted during uninstallation

  # Remove the installed directory
  RMDir $INSTDIR

  # Other uninstallation tasks can be added here
SectionEnd