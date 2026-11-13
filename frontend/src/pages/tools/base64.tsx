import { Base64 } from 'js-base64';
import { TextConverter } from '@/components/text-converter';

function decode(value: string) {
  const binary = atob(value.replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

export function Base64Page() {
  return <TextConverter title="Base64 编码/解码" encodedLabel="Base64" encode={Base64.encode} decode={decode} />;
}
