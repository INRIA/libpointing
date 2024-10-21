# tests/hidreportparser/hidreportparser.pro --
#
# Initial software
# Authors: Izzat Mukhanov
# Copyright © INRIA

TEMPLATE  = app
CONFIG   += warn_on link_prl testcase
CONFIG   -= app_bundle

QT -= gui
QT += testlib

TARGET = hidreportparser

POINTING = ../..
include($$POINTING/pointing/pointing.pri)

HEADERS   += hidreportparser.h
