import { useState } from 'react';
import { TextConverter } from '@/components/text-converter';

export function UrlEncoderPage() {
  const [component, setComponent] = useState(true);

  return (
    <TextConverter
      title="URL 编码/解码"
      encodedLabel="URL 编码文本"
      encode={component ? encodeURIComponent : encodeURI}
      decode={component ? decodeURIComponent : decodeURI}
      options={
        <fieldset className="flex flex-wrap gap-x-5">
          <legend className="sr-only">编码范围</legend>
          <label className="flex min-h-12 cursor-pointer items-center gap-2 text-sm">
            <input type="radio" name="url-mode" value="component" checked={component} onChange={() => setComponent(true)} />
            参数值
          </label>
          <label className="flex min-h-12 cursor-pointer items-center gap-2 text-sm">
            <input type="radio" name="url-mode" value="uri" checked={!component} onChange={() => setComponent(false)} />
            完整 URL
          </label>
        </fieldset>
      }
    />
  );
}
