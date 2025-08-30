let maintenanceStatus = false; // Status awal maintenance
let maintenanceStartTime = null; // Waktu mulai maintenance
let maintenanceTimeout = null; // Timeout untuk maintenance

// Mengatur maintenance mode
function setMaintenance(status, duration) {
    maintenanceStatus = status;

    if (maintenanceTimeout) {
        clearTimeout(maintenanceTimeout);
        maintenanceTimeout = null;
    }

    if (status && duration) {
        maintenanceStartTime = Date.now();

        let durationInMillis;
        const durationPattern = /(\d+)([smhd])/;
        const match = duration.match(durationPattern);

        if (match) {
            const value = parseInt(match[1], 10);
            const unit = match[2];

            switch (unit) {
                case 'm': durationInMillis = value * 60 * 1000; break;
                case 'h': durationInMillis = value * 60 * 60 * 1000; break;
                case 'd': durationInMillis = value * 24 * 60 * 60 * 1000; break;
                default:
                    console.log('Invalid duration format.');
                    return;
            }

            maintenanceTimeout = setTimeout(() => {
                maintenanceStatus = false;
                maintenanceStartTime = null;
                console.log('Maintenance mode ended automatically.');
            }, durationInMillis);

            console.log(`Maintenance mode enabled for ${value} ${unit}.`);
        } else {
            console.log("Invalid duration format. Use '5m', '2h', or '1d'.");
        }
    } else {
        maintenanceStartTime = null;
        console.log(`Maintenance mode is now ${status ? 'enabled' : 'disabled'}.`);
    }
}

// Mengecek apakah bot dalam mode maintenance
function isMaintenance() {
    return maintenanceStatus; // Nilai boolean
}

// Mendapatkan sisa waktu maintenance
function getMaintenanceTimeLeft() {
    if (!maintenanceStatus) {
        return "Maintenance is not currently active.";
    }

    const elapsed = Date.now() - maintenanceStartTime;
    const remainingTime = Math.max(0, maintenanceTimeout._idleTimeout - elapsed);

    const minutesLeft = Math.floor(remainingTime / (60 * 1000));
    const hoursLeft = Math.floor(minutesLeft / 60);
    const daysLeft = Math.floor(hoursLeft / 24);

    const formattedTime = `${daysLeft}d ${hoursLeft % 24}h ${minutesLeft % 60}m`;
    return `Time left for maintenance: ${formattedTime}`;
}

module.exports = { setMaintenance, isMaintenance, getMaintenanceTimeLeft };
