from fastapi import FastAPI
import numpy as np
import tensorflow as tf
import joblib
from pydantic import BaseModel

# Inicializando a API
app = FastAPI()

# Carregando o modelo treinado e o normalizador
model = tf.keras.models.load_model("meu_modelo.h5")
scaler = joblib.load("scaler.pkl")

# Definindo a estrutura dos dados esperados
class InputData(BaseModel):
    features: list  # Lista de valores numéricos

@app.post("/predict")
def predict(data: InputData):
    try:
        # Convertendo entrada em numpy array e normalizando
        input_array = np.array(data.features).reshape(1, -1)
        input_scaled = scaler.transform(input_array)

        # Fazendo a previsão
        prediction = model.predict(input_scaled)[0][0]

        # Convertendo para classe binária
        result = int(prediction > 0.5)
        
        return {"prediction": result, "confidence": float(prediction)}

    except Exception as e:
        return {"error": str(e)}

# Teste rápido: rode a API com
# uvicorn api:app --reload
