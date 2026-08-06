import sys

from .libpointing import (
    PointingDevice,
    DisplayDevice,
    TransferFunction,
    PointingDeviceManager,
    PointingDeviceDescriptor,
    PointingCursor,
)

if sys.platform.startswith("win"):
    from .libpointing import winSystemPointerAcceleration