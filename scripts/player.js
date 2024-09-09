class PlayerHandler {

    constructor(scene) {
        this._schene = scene;
    }

    init() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('assets/bird_asset.png')
         });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this._schene.add(this.mesh);
    }

}