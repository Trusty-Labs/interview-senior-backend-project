import { Stack, Construct } from "@aws-cdk/core";
import { Runtime, Code, LayerVersion } from "@aws-cdk/aws-lambda";

interface UploadContentStackProps {
  env: any;
}

export class UploadContentStack extends Stack {
  constructor(scope: Construct, id: string, props: UploadContentStackProps) {
    super(scope, id, { env: props.env });

    const imageLayer = new LayerVersion(this, "image-layer", {
      layerVersionName: "image-layer",
      compatibleRuntimes: [Runtime.NODEJS_12_X],
      code: Code.fromAsset("layers/img-convert/convert-with-heic"),
    });

    // LAMBDA CODE ASSETS
    const upload = Code.fromAsset("lambdas/upload");
    const convert = Code.fromAsset("lambdas/convert");
    const layers = [imageLayer];
  }
}
