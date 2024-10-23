//const resolve = require('rollup-plugin-node-resolve')
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy'


export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
                sourcemap: false,
            }
        ],
        plugins: [
            typescript(),
            copy({
                targets: [
                    { src: 'examples/index.html', dest: 'dist' },
                ]
            })
        ]
    }
]
