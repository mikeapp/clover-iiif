import { encodeContentState } from "@iiif/vault-helpers";
import {
  decodeContentStateCanvasURI,
  decodeContentStateContainerURI,
  decodeContentStateManifestURI,
} from "src/lib/iiif";
import { expect } from "vitest";

// URIs for fixtures
const canvas1 =
  "https://api.dc.library.northwestern.edu/api/v2/works/71153379-4283-43be-8b0f-4e7e3bfda275?as=iiif/canvas/access/2";
const manifest1 =
  "https://api.dc.library.northwestern.edu/api/v2/works/71153379-4283-43be-8b0f-4e7e3bfda275?as=iiif";
const manifest2 =
  "https://api.dc.library.northwestern.edu/api/v2/works/b6584c92-8465-4969-afe4-8e2f94988acf?as=iiif";
const collection2 =
  "https://api.dc.library.northwestern.edu/api/v2/collections/55ff2504-dd53-4943-b2cb-aeea46e77bc3?as=iiif";

// fixtures
const manifestURI = manifest1;
const collectionURI = collection2;
const canvasContentState = encodeContentState(
  JSON.stringify({
    id: canvas1,
    type: "Canvas",
    partOf: [
      {
        id: manifest1,
        type: "Manifest",
      },
    ],
  }),
);
const manifestContentState = encodeContentState(
  JSON.stringify({
    id: manifest2,
    type: "Manifest",
    partOf: [
      {
        id: collection2,
        type: "Collection",
      },
    ],
  }),
);
const canvasAnnotationContentState = encodeContentState(
  JSON.stringify({
    id: "https://example.org/import/1",
    type: "Annotation",
    motivation: ["contentState"],
    target: {
      id: canvas1,
      type: "Canvas",
      partOf: [
        {
          id: manifest1,
          type: "Manifest",
        },
      ],
    },
  }),
);
const emptyPartOfContentState = encodeContentState(
  JSON.stringify({
    id: manifest1,
    type: "Manifest",
    partOf: [],
  }),
);
const emptyPartOfContentState2 = encodeContentState(
  JSON.stringify({
    id: collection2,
    type: "Collection",
    partOf: [],
  }),
);

test("iiifContent as Manifest URI", () => {
  const containerURI = decodeContentStateContainerURI(manifestURI);
  expect(containerURI).toBe(manifest1);
});

test("iiifContent as Manifest URI", () => {
  const containerURI = decodeContentStateContainerURI(collectionURI);
  expect(containerURI).toBe(collection2);
});

test("iiifContent as annotation body with Canvas partOf Manifest", () => {
  const containerURI = decodeContentStateContainerURI(canvasContentState);
  expect(containerURI).toBe(manifest1);
  const canvasURI = decodeContentStateCanvasURI(canvasContentState);
  expect(canvasURI).toBe(canvas1);
  const manifestURI = decodeContentStateManifestURI(canvasContentState);
  expect(manifestURI).toBe(manifest1);
});

test("iiifContent as annotation body with Manifest partOf Collection", () => {
  const containerURI = decodeContentStateContainerURI(manifestContentState);
  expect(containerURI).toBe(collection2);
  const canvasURI = decodeContentStateCanvasURI(manifestContentState);
  expect(canvasURI).toBe(undefined);
  const manifestURI = decodeContentStateManifestURI(manifestContentState);
  expect(manifestURI).toBe(manifest2);
});

test("iiifContent as complete annotation with Canvas partOf Manifest", () => {
  const containerURI = decodeContentStateContainerURI(
    canvasAnnotationContentState,
  );
  expect(containerURI).toBe(manifest1);
  const canvasURI = decodeContentStateCanvasURI(canvasAnnotationContentState);
  expect(canvasURI).toBe(canvas1);
  const manifestURI = decodeContentStateManifestURI(
    canvasAnnotationContentState,
  );
  expect(manifestURI).toBe(manifest1);
});

test("iiifContent with Manifest, partOf empty", () => {
  const containerURI = decodeContentStateContainerURI(emptyPartOfContentState);
  expect(containerURI).toBe(manifest1);
  const canvasURI = decodeContentStateCanvasURI(emptyPartOfContentState);
  expect(canvasURI).toBe(undefined);
  const manifestURI = decodeContentStateManifestURI(emptyPartOfContentState);
  expect(manifestURI).toBe(manifest1);
});

test("iiifContent with Collection, partOf empty", () => {
  const containerURI = decodeContentStateContainerURI(emptyPartOfContentState2);
  expect(containerURI).toBe(collection2);
  const canvasURI = decodeContentStateCanvasURI(emptyPartOfContentState2);
  expect(canvasURI).toBe(undefined);
  const manifestURI = decodeContentStateManifestURI(emptyPartOfContentState2);
  expect(manifestURI).toBe(undefined);
});