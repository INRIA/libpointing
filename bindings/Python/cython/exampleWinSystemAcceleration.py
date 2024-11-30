from libpointing import PointingDevice, DisplayDevice, TransferFunction, winSystemPointerAcceleration
winSys = winSystemPointerAcceleration()

# Print the current configuration
print(winSys.get())

# Change the settings
winSys.set(4, True)

# Print again
print(winSys.get())

# Change the transfer function
# pdev = PointingDevice(b"any:")
# ddev = DisplayDevice.create("any:")
# tfct = TransferFunction(b"system:", pdev, ddev)

# tfct.getURI()

# winSys.setTransferFunction(tfct.getURI())

winSys.setTransferFunction(b"system:")