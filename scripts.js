function useNotifications() {
    const notificationContainer = document.getElementById('notifications');
    const delay = 4000;
    let pausedTime;
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

        let startTime = Date.now();
        const getRemainingTime = (delayTime) => {
            const checkTime = !delayTime ? delay : delayTime;
            const elapsedTime = Date.now() - startTime;
            console.log('elapsedTime', elapsedTime, 'checkTime', checkTime, 'startTime', startTime);
            const remainingTime = checkTime - elapsedTime;
            return remainingTime
        };
        
        notification.addEventListener('mouseenter', () => {
            startTime = Date.now()
            pausedTime = getRemainingTime()
            clearTimeout(timeoutId);
            console.log('pausedTime', pausedTime);
        });

        notification.addEventListener('mouseleave', () => {
            const timeoutId = setTimeout(() => {
                removeNotification(notification);
            }, pausedTime);
            startTime = Date.now()
            getRemainingTime(pausedTime)
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