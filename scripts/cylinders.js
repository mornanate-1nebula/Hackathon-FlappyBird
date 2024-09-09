/**
 * DETERMINES WHERE THE PIPES WILL START TO RENDER
 */
const VARS_PIPES_STARTING_Z_AXIS = -75;
/**
 * DETERMINES HOW FAR EACH PIPELINE COLLECTION SHOULD BE FROM EACH OTHER
 */
const VARS_PIPES_GAP_BETWEEN_PIPES = 25;
/**
 * DETERMINES WHEN THE PIPES SHOULD START ON THE STARTING POSSITION AGAIN
 */
const VARS_PIPES_PIPE_RESET_Z_AXIS = 7;
/**
 * Determines how fast the pipes move
 */
const VARS_PIPES_TRAVEL_SPEED = 0.2;

class PipeHandler {

    constructor(scene) {
        this._schene = scene;
    }

    init() {
        var startingPostion = VARS_PIPES_STARTING_Z_AXIS;

        this.pipeCollection1 = new PipeCollection(this._schene);
        this.pipeCollection1.init(startingPostion);

        startingPostion += VARS_PIPES_GAP_BETWEEN_PIPES;
        this.pipeCollection2 = new PipeCollection(this._schene);
        this.pipeCollection2.init(startingPostion);

        startingPostion += VARS_PIPES_GAP_BETWEEN_PIPES;
        this.pipeCollection3 = new PipeCollection(this._schene);
        this.pipeCollection3.init(startingPostion);
    }

    animate() {
        this.pipeCollection1.animate(VARS_PIPES_TRAVEL_SPEED);
        this.pipeCollection2.animate(VARS_PIPES_TRAVEL_SPEED);
        this.pipeCollection3.animate(VARS_PIPES_TRAVEL_SPEED);
    }

}

class PipeCollection {
    constructor(scene) {
        this._schene = scene;
    }

    init(startingZAxis) {
        var pipes = this.calculatePipesAxis();
        var pipe1 = pipes[0];
        var pipe2 = pipes[1];
        
        //RED PIPE
        this._cylinder1 = new Pipe(0x040dbf, pipe1.radiusTop, pipe1.radiusBottom, pipe1.height, pipe1.radialSegments);
        this._schene.add(this._cylinder1.mesh);
        this._cylinder1.mesh.position.z = startingZAxis;
        this._cylinder1.mesh.position.y = pipe1.axis;

        //BLUE PIPE
        this._cylinder2 = new Pipe(0x040dbf, pipe2.radiusTop, pipe2.radiusBottom, pipe2.height, pipe2.radialSegments);
        this._schene.add(this._cylinder2.mesh);
        this._cylinder2.mesh.position.z = startingZAxis;
        this._cylinder2.mesh.position.y = pipe2.axis;
    }

    animate(pipeTravelSpeed) {
        //MOVE THE PIPES TOWARDS THE PLAYER
        this._cylinder1.mesh.position.z += pipeTravelSpeed;
        this._cylinder2.mesh.position.z += pipeTravelSpeed;

        //DETERMINE WHEN THE PIPES SHOULD RESET.
        if (this._cylinder1.mesh.position.z >= VARS_PIPES_PIPE_RESET_Z_AXIS) {


            playerCounter += 1;

            var pipes = this.calculatePipesAxis();
            var pipe1 = pipes[0];
            var pipe2 = pipes[1];

            this._cylinder1.mesh.position.z = VARS_PIPES_STARTING_Z_AXIS;
            this._cylinder1.mesh.position.y = pipe1.axis;
            this._cylinder1.geometry.height = pipe1.height;

            this._cylinder2.mesh.position.z = VARS_PIPES_STARTING_Z_AXIS;
            this._cylinder2.mesh.position.y = pipe2.axis;
            this._cylinder2.geometry.height = pipe2.height;
        }
    }

    calculatePipesAxis(){
        //NEED TO DETERMINE DYNAMIC HEIGHTS AND Y AXIS FOR EACH PIPE IN THE COLLECTION
        var pipes_total_height = 10;
        var pipes_gap = 0.4;

        var max = (pipes_total_height - pipes_gap) / 2;
        var min = pipes_gap * 2;

        var pipe1_height = (Math.random() * (max - min)) + min;
        var pipe1_axis = pipe1_height - (pipe1_height / 2);

        var pipe2_height = pipes_total_height - pipe1_height - pipes_gap;
        var pipe2_axis = (pipe1_height * 2) + (pipe2_height / 2); //TODO: THIS IS 100 percent wrong
       
        var pipe1 = new pipeConfig(pipe1_height, pipe1_axis);
        var pipe2 = new pipeConfig(pipe2_height, pipe2_axis);

        return [pipe1, pipe2];
    }
}

class Pipe {
    constructor(
        color,
        radiusTop,
        radiusBottom,
        height,
        radialSegments,
        heightSegments,
        openEnded,
        thetaStart,
        thetaLength
    ) {
        this.geometry = new THREE.CylinderGeometry(
            radiusTop,
            radiusBottom,
            height,
            radialSegments,
            heightSegments,
            openEnded,
            thetaStart,
            thetaLength
        );

        this.material = new THREE.MeshBasicMaterial({ color: color });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}

class pipeConfig{
    constructor(_height, _axis){
        this.radiusTop = 2;
        this.radiusBottom = 2;
        this.radialSegments = 20; //THIS DETERMINES HOW MANY EDGES?
        this.height = _height;
        this.axis = _axis;
    }
}