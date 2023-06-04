import { populateBluetoothDevices } from '../helper/ble';

const Bluetooth = () => {
    return (
        <div>
            <h1>Devices</h1>
            <button onClick={(e) => populateBluetoothDevices(e)}>button</button>
        </div>
    );
};

export default Bluetooth;
