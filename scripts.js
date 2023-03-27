function useNotifications() {
    const notificationContainer = document.getElementById('notifications');
    const delay = 4000
    const notifications = [];
    const timeouts = [];
    const colour = {
        'success': {
            backgroundColor: '#ACD6A7',
            loadingColor: 'green'
        },
        'error': {
            backgroundColor: '#F59797',
            loadingColor: 'red'
        },
        'info': {
            backgroundColor: '#9DADD6',
            loadingColor: 'blue'
        },
        'warning': {
            backgroundColor: '#FAF5BD',
            loadingColor: 'Yellow'
        }
    }

    function showNotification(type, message) {
    
        const colorType = type.toLowerCase()
        const notification = document.createElement('div');
        const loader = document.createElement('hr');
        notification.classList.add('notification');
        loader.classList.add('loader')
        notification.classList.add(type.toLowerCase());
        notification.textContent = message;
        notificationContainer.appendChild(notification);
        notification.appendChild(loader)
        notifications.push(notification);
        notification.style.backgroundColor = colour[colorType].backgroundColor
        loader.style.background = colour[colorType].loadingColor
        
        // for getting remaining time

        const timeoutId = setTimeout(() => {
            removeNotification(notification);
        }, delay);
        const startTime = Date.now();
        const getRemainingTime = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = delay - elapsedTime;
            return remainingTime
        };

        notification.addEventListener('mouseenter', () => {
             clearTimeout(timeoutId);
        });

        notification.addEventListener('mouseleave', () => {
            const timeoutId = setTimeout(() => {
                removeNotification(notification);
            }, getRemainingTime());
            timeouts.push(timeoutId);
        });
    }

    function removeNotification(notification) {
        const index = notifications.indexOf(notification);
        if (index > -1) {
            notifications.splice(index, 1);
            notification.remove();
        }
    }
    return { showNotification };
}

const { showNotification } = useNotifications();

document.getElementById('success-button').addEventListener('click', () => {
    showNotification('SUCCESS', 'Success!');
});

document.getElementById('error-button').addEventListener('click', () => {
    showNotification('ERROR', 'Error!');
});

document.getElementById('info-button').addEventListener('click', () => {
    showNotification('INFO', 'Info!');
});

document.getElementById('warning-button').addEventListener('click', () => {
    showNotification('WARNING', 'Warning!');
});