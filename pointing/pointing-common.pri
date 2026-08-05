# pointing/pointing-common.pri --
#
# Initial software
# Authors: Nicolas Roussel
# Copyright © INRIA

#message("Using pointing-common.pri")

# Remove these optimization flags...
QMAKE_CXXFLAGS_RELEASE -= -O
QMAKE_CXXFLAGS_RELEASE -= -O1
QMAKE_CXXFLAGS_RELEASE -= -O2
# ... and add -O3 if not present (might not work on all platforms)
win32-msvc* {
  QMAKE_CXXFLAGS_RELEASE *= -O2
} else {
  QMAKE_CXXFLAGS_RELEASE *= -O3
}

macx {
    # Needed for IOHIDDeviceRegisterInputReportWithTimeStampCallback
    QMAKE_MACOSX_DEPLOYMENT_TARGET = 10.15
    # QMAKE_MAC_SDK = macosx10.15
    # Uncomment the following line to build a universal binary for macOS python binding
    QMAKE_APPLE_DEVICE_ARCHS = x86_64 arm64
    # for CI on github actions as it is only arm64
    # QMAKE_APPLE_DEVICE_ARCHS = arm64
}

# Compile with c++11 on unix (Qt5/Qt4). Qt6 requires c++17
unix {
    # QMAKE_CXXFLAGS += -std=c++11
    CONFIG += c++17
}

windows {
  # See http://blogs.msdn.com/b/oldnewthing/archive/2007/04/11/2079137.aspx
  #     and http://msdn.microsoft.com/en-us/library/aa383745.aspx
  DEFINES += _WIN32_WINNT="0x0600"      # Windows Vista
  DEFINES += _WIN32_WINDOWS="0x0600"    # ???
  DEFINES += NTDDI_VERSION="0x06000000" # Windows Vista
  #QMAKE_LFLAGS_DEBUG += /INCREMENTAL:NO

  LIBS    += -lsetupapi -lgdi32 -lwbemuuid -lAdvapi32 -luser32 -lHid# -lcomsupp
  CONFIG  += windows console

  # Compile with mingw
  win32-g++ {
      QMAKE_CXXFLAGS += -std=gnu++0x
      QMAKE_LFLAGS += -static -lpthread -static-libgcc -static-libstdc++
  }
}
