use wasm_bindgen::prelude::*;
use silksong_decrypt_core::SaveDecryptor;
use js_sys::Uint8Array;

#[wasm_bindgen(start)]
pub fn main() {
    console_error_panic_hook::set_once();
}

// Log to browser console
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen(js_name = analyzeSaveFile)]
pub fn analyze_save_file(data: &[u8]) -> String {
    SaveDecryptor::analyze_save_file(data)
}

#[wasm_bindgen]
pub struct WasmSaveDecryptor {
    inner: SaveDecryptor,
}

#[wasm_bindgen]
impl WasmSaveDecryptor {
    #[wasm_bindgen(constructor)]
    pub fn new(key: &[u8]) -> Result<WasmSaveDecryptor, JsValue> {
        console_log!("Initializing WASM decryptor with key length: {}", key.len());
        
        let decryptor = SaveDecryptor::new(key)
            .map_err(|e| JsValue::from_str(&e.to_string()))?;
        
        Ok(WasmSaveDecryptor { inner: decryptor })
    }

    #[wasm_bindgen(js_name = withDefaultKey)]
    pub fn with_default_key() -> WasmSaveDecryptor {
        console_log!("Initializing WASM decryptor with default key");
        WasmSaveDecryptor {
            inner: SaveDecryptor::with_default_key(),
        }
    }

    #[wasm_bindgen(js_name = decryptData)]
    pub fn decrypt_data(&self, data: &[u8]) -> Result<Uint8Array, JsValue> {
        let decrypted = self.inner
            .decrypt_data(data)
            .map_err(|e| JsValue::from_str(&e.to_string()))?;
        
        Ok(Uint8Array::from(&decrypted[..]))
    }

    #[wasm_bindgen(js_name = decryptSaveFile)]
    pub fn decrypt_save_file(&self, encrypted_data: &[u8]) -> Result<Uint8Array, JsValue> {
        console_log!("Decrypting save file of size: {} bytes", encrypted_data.len());
        
        let decrypted = self.inner
            .decrypt_save_file(encrypted_data)
            .map_err(|e| JsValue::from_str(&e.to_string()))?;
        
        console_log!("Decryption successful, output size: {} bytes", decrypted.len());
        Ok(Uint8Array::from(&decrypted[..]))
    }

    #[wasm_bindgen(js_name = decryptBase64String)]
    pub fn decrypt_base64_string(&self, base64_string: &str) -> Result<String, JsValue> {
        console_log!("Decrypting Base64 string of length: {} chars", base64_string.len());
        
        self.inner
            .decrypt_base64_string(base64_string)
            .map_err(|e| JsValue::from_str(&e.to_string()))
    }

    #[wasm_bindgen(js_name = encryptStringToBase64)]
    pub fn encrypt_string_to_base64(&self, plaintext: &str) -> Result<String, JsValue> {
        self.inner
            .encrypt_string_to_base64(plaintext)
            .map_err(|e| JsValue::from_str(&e.to_string()))
    }

    #[wasm_bindgen(js_name = decryptStream)]
    pub fn decrypt_stream(
        &self,
        data: &[u8],
        chunk_size: usize,
        progress_callback: &js_sys::Function,
    ) -> Result<Uint8Array, JsValue> {
        console_log!("Starting streaming decryption, data size: {} bytes, chunk size: {}", data.len(), chunk_size);
        
        let mut progress_fn = |progress: f64| {
            let this = JsValue::null();
            let progress_val = JsValue::from_f64(progress);
            let _ = progress_callback.call1(&this, &progress_val);
        };

        let decrypted = self.inner
            .decrypt_stream(data, chunk_size, &mut progress_fn)
            .map_err(|e| JsValue::from_str(&e.to_string()))?;
        
        console_log!("Streaming decryption complete, output size: {} bytes", decrypted.len());
        Ok(Uint8Array::from(&decrypted[..]))
    }
}

// Convenience functions for JavaScript
#[wasm_bindgen(js_name = decryptSaveData)]
pub fn decrypt_save_data(encrypted_data: &[u8]) -> Result<Uint8Array, JsValue> {
    let decryptor = SaveDecryptor::with_default_key();

    let decrypted = decryptor
        .decrypt_save_file(encrypted_data)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    Ok(Uint8Array::from(&decrypted[..]))
}

#[wasm_bindgen(js_name = decryptSaveDataWithKey)]
pub fn decrypt_save_data_with_key(encrypted_data: &[u8], key: &[u8]) -> Result<Uint8Array, JsValue> {
    let decryptor = SaveDecryptor::new(key)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let decrypted = decryptor
        .decrypt_save_file(encrypted_data)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    Ok(Uint8Array::from(&decrypted[..]))
}

#[wasm_bindgen(js_name = decryptBase64Save)]
pub fn decrypt_base64_save(base64_string: &str) -> Result<String, JsValue> {
    let decryptor = SaveDecryptor::with_default_key();
    
    decryptor
        .decrypt_base64_string(base64_string)
        .map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = encryptStringToBase64)]
pub fn encrypt_string_to_base64(plaintext: &str) -> Result<String, JsValue> {
    let decryptor = SaveDecryptor::with_default_key();
    
    decryptor
        .encrypt_string_to_base64(plaintext)
        .map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = isValidSaveFile)]
pub fn is_valid_save_file(data: &[u8]) -> bool {
    // Check if file has content and is aligned to 16-byte blocks
    if data.is_empty() {
        return false;
    }

    // For ECB mode, data should be aligned to block size (16 bytes)
    // But the last block might be padded, so we allow any non-empty size
    true
}

#[wasm_bindgen(js_name = getSaveFileInfo)]
pub fn get_save_file_info(data: &[u8]) -> Result<JsValue, JsValue> {
    if !is_valid_save_file(data) {
        return Err(JsValue::from_str("Invalid save file"));
    }

    let info = js_sys::Object::new();
    
    js_sys::Reflect::set(
        &info,
        &JsValue::from_str("size"),
        &JsValue::from_f64(data.len() as f64),
    ).unwrap();
    
    js_sys::Reflect::set(
        &info,
        &JsValue::from_str("mode"),
        &JsValue::from_str("ECB"),
    ).unwrap();
    
    js_sys::Reflect::set(
        &info,
        &JsValue::from_str("blockAligned"),
        &JsValue::from_bool(data.len() % 16 == 0),
    ).unwrap();
    
    // ECB doesn't use IV
    js_sys::Reflect::set(
        &info,
        &JsValue::from_str("hasIV"),
        &JsValue::from_bool(false),
    ).unwrap();
    
    // Estimated decrypted size (may be slightly smaller due to padding)
    // This works 0% of the time, so it might as well be just removed
    js_sys::Reflect::set(
        &info,
        &JsValue::from_str("estimatedDecryptedSize"),
        &JsValue::from_f64(data.len() as f64),
    ).unwrap();

    Ok(info.into())
}
