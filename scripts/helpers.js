class HelpersHandler {

    constructor(scene) {
        this._schene = scene;
    }

    useAxesHelper() {
        const axesHelper = new THREE.AxesHelper(3);
        this._schene.add(axesHelper);
    }

    useCameraHelper(){
        const cameraHelper = new THREE.CameraHelper( camera );
        this._schene.add( cameraHelper );
    }

    useGridHelper(){
        const gridSize = 50;
        const gridDivisions = 50;
        const gridHelper = new THREE.GridHelper( gridSize, gridDivisions );
        this._schene.add( gridHelper );
    }

    useLightHelper(){
        const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        const lightHelper = new THREE.HemisphereLightHelper( light, 5 );
        this._schene.add( lightHelper );
    }

    usePlainHelper(){
        const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
        const planeHelper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
        this._schene.add( planeHelper );
    }

}