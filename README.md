[![PyPI Version](https://img.shields.io/pypi/v/libpointing)](https://pypi.org/project/libpointing/)
[![Downloads](https://static.pepy.tech/badge/libpointing)](https://pepy.tech/project/libpointing)
[![NPM Version](https://badge.fury.io/js/libpointing.svg?style=flat)](https://npmjs.org/package/libpointing)
[![Homebrew Version](https://img.shields.io/homebrew/v/libpointing.svg)](https://formulae.brew.sh/formula/libpointing)
[![choco-shield](https://img.shields.io/chocolatey/v/libpointing)](https://community.chocolatey.org/packages/libpointing)

[![Linux](https://github.com/INRIA/libpointing/actions/workflows/linux.yml/badge.svg)](https://github.com/INRIA/libpointing/actions/workflows/linux.yml)
[![macOS](https://github.com/INRIA/libpointing/actions/workflows/macOS.yml/badge.svg)](https://github.com/INRIA/libpointing/actions/workflows/macOS.yml)

# Libpointing

An open-source cross-platform library to get raw events from pointing devices and master transfer functions.

## Description

Libpointing is an open-source cross-platform library written in C++ that provides direct access to HID pointing devices and supports the design of pointing transfer functions. External contributions as pull requests are welcome!

- If you use libpointing for industrial purposes, please consider funding libpointing through a research contract with Inria (contact Géry Casiez or Nicolas Roussel for this).

- If you use libpointing for academic purposes, please cite: Casiez, G. & Roussel, N. (2011). No more bricolage! Methods and tools to characterize, replicate and compare pointing transfer functions. In proceedings of UIST'11, the 24th ACM Symposium on User Interface Software and Technology, 603-614. ACM Press. [DOI](http://dx.doi.org/10.1145/2047196.2047276)

[![DOI](https://img.shields.io/badge/doi-10.1145%2F2047196.2047276-blue)](https://doi.org/10.1145/2047196.2047276)

```
@inproceedings{Casiez:2011:NMB:2047196.2047276,
 author = {Casiez, G{\'e}ry and Roussel, Nicolas},
 title = {No More Bricolage!: Methods and Tools to Characterize, Replicate and Compare Pointing Transfer Functions},
 booktitle = {Proceedings of the 24th Annual ACM Symposium on User Interface Software and Technology},
 series = {UIST '11},
 year = {2011},
 isbn = {978-1-4503-0716-1},
 location = {Santa Barbara, California, USA},
 pages = {603--614},
 numpages = {12},
 url = {http://doi.acm.org/10.1145/2047196.2047276},
 doi = {10.1145/2047196.2047276},
 acmid = {2047276},
 publisher = {ACM},
 address = {New York, NY, USA},
 keywords = {CD gain, control-display gain functions, pointer acceleration, pointing, toolkit, transfer functions},
} 
```

## Installation

Visit [installation page](https://github.com/INRIA/libpointing/wiki/Installation) or build it from source.

## Documentation

Please visit our [wiki](https://github.com/INRIA/libpointing/wiki).

## Features

* runs on Windows, Mac OS X and Linux,
* makes it easy to choose the devices at run-time through the use of URIs,
* provides raw information from input devices,
* provides resolution and frequency information for the available pointing and display devices,
* supports hot-plugging
* allows to bypass the system's transfer functions to receive raw asynchronous events from one or more pointing devices.
* replicates as faithfully as possible the transfer functions used by **Microsoft Windows**, **Apple OS X** and **Xorg** (the X.Org Foundation server).
* running on these three platforms, it makes it possible to compare the replicated functions to the genuine ones as well as custom ones.
* provides the functionality to use existing transfer functions, custom ones or even build your own functions.
* supports [subpixel interaction](http://dx.doi.org/10.1145/2380116.2380162).
* Java, Python, Node.js bindings are available.

## Minimalistic example

Once you correctly installed *libpointing* and linked it to your project, simply write `#include <pointing/pointing.h>` and start coding. Here is the console example which applies system specific transfer function to an input device and outputs the results to console:

```C++
#include <iostream>
#include <pointing/pointing.h>

using namespace pointing;

TransferFunction *func = 0;

// context is user data, timestamp is a moment at which the event was received
// input_dx, input_dy are displacements in horizontal and vertical directions
// buttons is a variable indicating which buttons of the pointing device were pressed.
void pointingCallback(void *, TimeStamp::inttime timestamp, int input_dx, int input_dy, int buttons) {
	if (!func) return;

	int output_dx = 0, output_dy = 0;
	// In order to use a particular transfer function, its applyi method must be called.
	func->applyi(input_dx, input_dy, &output_dx, &output_dy, timestamp);

	std::cout << "Displacements in x and y: " << input_dx << " " << input_dy << std::endl;
	std::cout << "Corresponding pixel displacements: " << output_dx << " " << output_dy << std::endl;
}

int main() {
	// Basically, to start using main functionality of libpointing
	// one needs to create objects of PointingDevice, DisplayDevice classes,
	// connect them passing to TransferFunction class object.

	// Any available pointing and display devices
	// if debugLevel > 0, the list of available devices
	// and extended information will be output.
	PointingDevice *input = PointingDevice::create("any:?debugLevel=1");
	DisplayDevice *output = DisplayDevice::create("any:?debugLevel=1");

	func = TransferFunction::create("sigmoid:?debugLevel=2", input, output);

	// To receive events from PointingDevice object, a callback function must be set.
	input->setPointingCallback(pointingCallback);
	while (1)
		PointingDevice::idle(100); // milliseconds

	delete input;
	delete output;
	delete func;

	return 0;
}
```

## Contributors

* [Nicolas Roussel](http://direction.bordeaux.inria.fr/~roussel/)
* [Géry Casiez](https://gery.casiez.net/)
* [Izzatbek Mukhanov](https://www.linkedin.com/in/izzat-mukhanov-26a93b63)

## License

This software may be used and distributed according to the terms of the GNU General Public License version 2 or any later version.

Ad-hoc licences can be granted upon request.
