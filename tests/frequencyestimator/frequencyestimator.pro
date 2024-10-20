# tests/frequencyestimator/frequencyestimator.pro --
#
# Initial software
# Authors: Izzat Mukhanov
# Copyright © INRIA

TEMPLATE  = app
CONFIG   += warn_on link_prl testcase
CONFIG   -= app_bundle

QT -= gui
QT += testlib

TARGET = frequencyestimator

POINTING = ../..
include($$POINTING/pointing/pointing.pri)

HEADERS   += frequencyestimator.h

macx {
    QMAKE_APPLE_DEVICE_ARCHS = x86_64
}
