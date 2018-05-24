export default class GeoUtils {

    static findCurrentPosition() {
        return new Promise((resolveFn) => {
            navigator
                .geolocation
                .getCurrentPosition(({ coords }) => {
                    resolveFn({ lat: coords.latitude, lng: coords.longitude });
                });
        });
    }

    static calculateBounds(center, distance, { maps }) {
        const { computeOffset } = maps.geometry.spherical;
        const { LatLng } = maps;

        const radius = distance / 2;

        const bottomRight = computeOffset(new LatLng(center), radius, -45);
        const topLeft = computeOffset(new LatLng(center), radius, 135);

        return {
            north: topLeft.lat(),
            south: bottomRight.lat(),
            west: bottomRight.lng(),
            east: topLeft.lng()
        };
    }

    static boundsAreEqual(prev, next) {
        Object.keys(prev).reduce((result, key) => result && prev[key] === next[key], true);
    }

}
