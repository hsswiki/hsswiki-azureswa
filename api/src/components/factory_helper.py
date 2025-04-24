import logging
from enum import Enum
from importlib import import_module

from src.settings.app_settings import app_settings


class FactoryType(str, Enum):
    CHAT_MODEL = "chat_model"
    EMBEDDING_MODEL = "embedding_model"
    VECTOR_STORE = "vector_store"


def get_factory_from_settings(factory_type: FactoryType) -> type:
    """
    Returns the factory class based on the environment variable from settings.
    """
    component_class_name = getattr(app_settings, factory_type.value)
    if isinstance(component_class_name, Enum):
        component_class_name = component_class_name.value
    logging.info(f"{component_class_name=}")
    
    component_factory_module = import_module(
        f"src.components.{factory_type.value}s.factories"
    )
    factory_class = getattr(
        component_factory_module, f"{component_class_name}Factory"
    )
    logging.info(f"{factory_class=}")
    return factory_class
