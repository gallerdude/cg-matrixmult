var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    console.log(transforms)
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    
    // if only one transform, set compound transform equal to it
    // otherwise multiply all matrices together (in proper order)
    // `compound_transform = Matrix.multiply(...)`
    var transform_matrices = transforms.map(transform => {
        /* THIS IS THE SPOT I COULDN'T FIGURE OUT
            I assume this looks like some sort of case switch where we use our functions to transform the transforms,
            but I'm kind of lost in all of these objects and fields
        */
        if (transform.type === "translate") Mat4x4Translate(transform, transform.mat4x4[0], transform.mat4x4[1], transform.mat4x4[2]);

        let result = new Matrix(4, 4);
        result.data = transform.values;
        return result
    });

    compound_transform = new Matrix(4, 4); // change / remove this

    transform_matrices.forEach(transform_matrix => {
        compound_transform = Matrix.multiply([compound_transform, transform_matrix]);
    });

    console.log("compound_transform", compound_transform)
    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiple vertex by compound_transform
    // `final_vertex = Matrix.multiply(...)`
    var final_vertex = new Vector(4); // change / remove this
    final_vertex = Matrix.multiply([vertex, compound_transform]);
    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;

    app.transforms = app.transforms.map(transform => {
        transform.mat4x4 = new Matrix(4, 4);
        Mat4x4Identity(transform.mat4x4);

        if (transform.type === "translate") Mat4x4Translate(transform.mat4x4);
    });
    // update `app.transforms[index].mat4x4`
    

    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
