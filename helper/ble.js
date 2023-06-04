export function populateBluetoothDevices() {
    // const devicesSelect = document.querySelector('#devicesSelect');
    console.log('Getting existing permitted Bluetooth devices...');
    navigator.bluetooth
        .getDevices()
        .then((devices) => {
            console.log('> Got ' + devices.length + ' Bluetooth devices.');

            for (const device of devices) {
                const option = document.createElement('option');
                option.value = device.id;
                option.textContent = device.name;
                console.log(option);
                // devicesSelect.appendChild(option);
            }
        })
        .catch((error) => {
            log('Argh! ' + error);
        });
}

export function onRequestBluetoothDeviceButtonClick() {
    log('Requesting any Bluetooth device...');
    navigator.bluetooth
        .requestDevice({
            // filters: [...] <- Prefer filters to save energy & show relevant devices.
            acceptAllDevices: true,
        })
        .then((device) => {
            log('> Requested ' + device.name + ' (' + device.id + ')');
            populateBluetoothDevices();
        })
        .catch((error) => {
            log('Argh! ' + error);
        });
}

export function onForgetBluetoothDeviceButtonClick() {
    navigator.bluetooth
        .getDevices()
        .then((devices) => {
            // const deviceIdToForget = document.querySelector('#devicesSelect').value;
            // const device = devices.find((device) => device.id == deviceIdToForget);
            const device = null;
            if (!device) {
                throw new Error('No Bluetooth device to forget');
            }
            log('Forgetting ' + device.name + 'Bluetooth device...');
            return device.forget();
        })
        .then(() => {
            log('  > Bluetooth device has been forgotten.');
            populateBluetoothDevices();
        })
        .catch((error) => {
            log('Argh! ' + error);
        });
}
